export type TaskCategory = "One Time" | "Daily" | "Social" | "Games & Products";

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  buttonText: string;
  reward: number;
  actionUrl?: string;
  isActive: boolean;
  isSpecial: boolean;
  order: number;
  createdAt: number;
}

interface TaskRow {
  id: string;
  title: string;
  category: TaskCategory;
  button_text: string;
  reward: number;
  action_url?: string;
  is_active: boolean;
  is_special: boolean;
  sort_order: number;
  created_at: string; // ISO timestamp
}

const mapRowToTask = (row: TaskRow): Task => ({
  id: row.id,
  title: row.title,
  category: row.category,
  buttonText: row.button_text,
  reward: row.reward,
  actionUrl: row.action_url,
  isActive: row.is_active,
  isSpecial: row.is_special,
  order: row.sort_order,
  createdAt: new Date(row.created_at).getTime(),
});

const mapTaskToRow = (task: Partial<Task>) => {
  const row: Partial<TaskRow> = {};
  if (task.title !== undefined) row.title = task.title;
  if (task.category !== undefined) row.category = task.category;
  if (task.buttonText !== undefined) row.button_text = task.buttonText;
  if (task.reward !== undefined) row.reward = task.reward;
  if (task.actionUrl !== undefined) row.action_url = task.actionUrl;
  if (task.isActive !== undefined) row.is_active = task.isActive;
  if (task.isSpecial !== undefined) row.is_special = task.isSpecial;
  if (task.order !== undefined) row.sort_order = task.order;
  return row;
};

export class TasksService {
  static async getAll(): Promise<Task[]> {
    const res = await fetch("/api/tasks", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch tasks");
    const { data } = await res.json();
    return (data || []).map(mapRowToTask);
  }

  static async getById(id: string): Promise<Task | null> {
    const res = await fetch(`/api/tasks?id=${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch task");
    const { data } = await res.json();
    return data ? mapRowToTask(data) : null;
  }

  static async create(task: Omit<Task, "id" | "createdAt">) {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...mapTaskToRow(task), created_at: new Date().toISOString() }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error ?? "Failed to create task");
    return json.id as string;
  }

  static async update(id: string, data: Partial<Task>) {
    const res = await fetch("/api/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...mapTaskToRow(data) }),
    });
    if (!res.ok) {
      const json = await res.json();
      throw new Error(json.error ?? "Failed to update task");
    }
  }

  static async delete(id: string) {
    const res = await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) {
      const json = await res.json();
      throw new Error(json.error ?? "Failed to delete task");
    }
  }
}

import type { ActivityDay } from "@/types";

export function generateActivityData(): ActivityDay[] {
  const days: ActivityDay[] = [];
  const today = new Date();

  for (let i = 139; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);

    const rand = Math.random();
    let count = 0;
    if (rand > 0.6) count = 1;
    if (rand > 0.75) count = 2;
    if (rand > 0.87) count = 3;
    if (rand > 0.95) count = 4;

    days.push({
      date: d.toISOString().split("T")[0],
      count,
    });
  }

  return days;
}

export function getStreakCount(data: ActivityDay[]): number {
  let streak = 0;
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].count > 0) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

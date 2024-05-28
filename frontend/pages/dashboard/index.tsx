import React, { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Activity {
  id: number;
  name: string;
  points: number;
}

interface UserActivity {
  id: number;
  userId: number;
  activityId: number;
  timestamp: Date;
}

interface DashboardData {
  users: User[];
  activities: Activity[];
  userActivities: UserActivity[];
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((response) => response.json())
      .then((data: DashboardData) => {
        // Convert timestamp strings to Date objects
        data.userActivities = data.userActivities.map((userActivity) => ({
          ...userActivity,
          timestamp: new Date(userActivity.timestamp),
        }));
        setData(data);
      });
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <div style={{ marginBottom: "20px" }}>
        <h2>Users</h2>
        <ul>
          {data.users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <h2>Activities</h2>
        <ul>
          {data.activities.map((activity) => (
            <li key={activity.id}>
              {activity.name} - {activity.points} points
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>User Activities</h2>
        <ul>
          {data.userActivities.map((userActivity) => {
            const user = data.users.find(
              (user) => user.id === userActivity.userId
            );
            const activity = data.activities.find(
              (activity) => activity.id === userActivity.activityId
            );
            return (
              <li key={userActivity.id}>
                {user?.name} did {activity?.name} -{" "}
                {userActivity.timestamp.toLocaleString()}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

/*
export default function DashboardPage() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-8`}
    >
      <div className="max-w-5xl w-full items-center justify-center">
        <h1 className="text-2xl font-bold text-center">Dashboard</h1>
      </div>
    </main>
  )
}
*/

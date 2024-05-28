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
  const [users, setUsers] = useState<User[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [userActivities, setUserActivities] = useState<UserActivity[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  async function getUsers() {
    return fetch(
      "https://glorious-bassoon-xp7j5gqpwg93wwx-8000.app.github.dev/users"
    )
      .then((response) => response.json())
      .then((data: User[]) => {
        // Convert timestamp strings to Date objects
        return data.map((user) => ({
          ...user,
        }));
      });
  }

  async function getActivities() {
    return fetch(
      "https://glorious-bassoon-xp7j5gqpwg93wwx-8000.app.github.dev/activities"
    )
      .then((response) => response.json())
      .then((data: Activity[]) => {
        // Convert timestamp strings to Date objects
        return data.map((activity) => ({
          ...activity,
        }));
      });
  }

  async function getUserActivities() {
    return fetch(
      "https://glorious-bassoon-xp7j5gqpwg93wwx-8000.app.github.dev/userActivities"
    )
      .then((response) => response.json())
      .then((data: UserActivity[]) => {
        // Convert timestamp strings to Date objects
        return data.map((userActivity) => ({
          ...userActivity,
          timestamp: new Date(userActivity.timestamp),
        }));
      });
  }

  useEffect(() => {
    async function getData() {
      try {
        const [usersData, activitiesData, userActivitiesData] =
          await Promise.all([getUsers(), getActivities(), getUserActivities()]);
        setUsers(usersData);
        setActivities(activitiesData);
        setUserActivities(userActivitiesData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  // colocado o endereço

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <div style={{ marginBottom: "20px" }}>
        <h2>Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <h2>Activities</h2>
        <ul>
          {activities.map((activity) => (
            <li key={activity.id}>
              {activity.name} - {activity.points} points
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>User Activities</h2>
        <ul>
          {userActivities.map((userActivity) => {
            const user = users.find((user) => user.id === userActivity.userId);
            const activity = activities.find(
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

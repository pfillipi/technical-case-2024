import { useEffect, useState } from "react";

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

export function useData() {
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

  return {
    users,
    activities,
    userActivities,
    isLoading,
  };
}

import { useData } from "@/src/hooks/useData";
import React, { useEffect, useState } from "react";

const Dashboard: React.FC = () => {
  const { isLoading, userActivities, users, activities } = useData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
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

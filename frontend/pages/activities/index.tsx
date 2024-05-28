import { useData } from "@/src/hooks/useData";
import React, { useEffect, useState } from "react";

const Activities: React.FC = () => {
  const { activities, isLoading, users, userActivities } = useData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
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
    </div>
  );
};

export default Activities;

import styles from "@/styles/css/sidebar.module.css";

export function Sidebar() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Fi</div>
      <ul className={styles.links}>
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.url}>{link.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const links = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "Users",
    url: "/users",
  },
  {
    label: "Activities",
    url: "/activities",
  },
  {
    label: "UsersActivities",
    url: "/useractivities",
  },
];

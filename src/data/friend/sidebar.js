export const sidebarData = [
  {
    id: 1,
    text: "Home",
    icon: <i className="fa-solid fa-user-group"></i>,
    url: "/friends/",
  },
  {
    id: 2,
    text: "Friend Requests",
    icon: <i className="fa-solid fa-people-arrows"></i>,
    url: "/friends/requests",
    nested: {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      ),
    },
  },
  {
    id: 3,
    text: "Suggestions",
    icon: <i className="fa-solid fa-user-plus"></i>,
    url: "/friends/suggestions",
    nested: {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      ),
    },
  },
  {
    id: 4,
    text: "All Friends",
    url: "/friends/list",
    icon: <i className="fa-solid fa-users-rays"></i>,
    nested: {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      ),
    },
  },
  {
    id: 5,
    text: "Custom Lists",
    url: "",
    icon: <i className="fa-solid fa-user-pen"></i>,
    nested: {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      ),
    },
  },
];

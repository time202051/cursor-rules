export function getCurrentWeek() {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
  const differenceToMonday = (dayOfWeek + 6) % 7; // Calculate the difference to Monday
  const monday = new Date(now);
  monday.setDate(now.getDate() - differenceToMonday);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从 0 开始
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  return [formatDate(monday) + " 00:00:00", formatDate(sunday) + " 23:59:59"];
}

export function getCurrentMonth() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  // 获取当前月份的第一天
  const firstDay = new Date(year, month, 1);
  // 获取当前月份的最后一天
  const lastDay = new Date(year, month + 1, 0);

  const format = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  return [
    `${format(firstDay)} 00:00:00`,
    `${format(lastDay)} 23:59:59`
  ];
}

export function get3to3Days() {
  const now = new Date();

  // 前三天0点0分0秒
  const startDate = new Date(now);
  startDate.setDate(now.getDate() - 3);

  // 后三天23点59分59秒
  const endDate = new Date(now);
  endDate.setDate(now.getDate() + 3);
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从 0 开始
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return [formatDate(startDate) + " 00:00:00", formatDate(endDate) + " 23:59:59"];
}

export function get3to3DaysOnlyDate() {
  const now = new Date();

  // 前三天0点0分0秒
  const startDate = new Date(now);
  startDate.setDate(now.getDate() - 3);

  // 后三天23点59分59秒
  const endDate = new Date(now);
  endDate.setDate(now.getDate() + 3);
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从 0 开始
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return [formatDate(startDate) + " 00:00:00", formatDate(endDate) + " 23:59:59"];
}

export function getThreeDaysAgo() {
  const now = new Date();
  const threeDaysAgo = new Date(now);
  threeDaysAgo.setDate(now.getDate() - 2);
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从 0 开始
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  return [
    formatDate(threeDaysAgo) + " 00:00:00",
    formatDate(now) + " 23:59:59",
  ];
}

export function getTwoDaysAgo() {
  const now = new Date();
  const threeDaysAgo = new Date(now);
  threeDaysAgo.setDate(now.getDate() - 1);
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从 0 开始
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  return [
    formatDate(threeDaysAgo) + " 00:00:00",
    formatDate(now) + " 23:59:59",
  ];
}

export function getTodayAgo() {
  const now = new Date();
  const threeDaysAgo = new Date(now);
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从 0 开始
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  return [
    formatDate(threeDaysAgo) + " 00:00:00",
    formatDate(now) + " 23:59:59",
  ];
}

export function getOneDaysAgo7hour() {
  const now = new Date();
  const threeDaysAgo = new Date(now);
  threeDaysAgo.setDate(now.getDate() - 1);
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从 0 开始
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  return [
    formatDate(threeDaysAgo) + " 07:00:00",
    formatDate(now) + " 07:00:00",
  ];
}

export function getYesterday() {
  const today = new Date();
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, '0');
  const day = String(yesterday.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

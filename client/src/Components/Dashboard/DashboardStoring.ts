import axios from 'axios';

export async function addUserToDB(userID: string) {
    await axios({
        method: 'post',
        url: '/api/v1/add-user',
        data: {
            userID: userID,
        },
    });
}

export async function loadDashboardsListFromDB(userID: string) {
    const response = await axios({
        method: 'post',
        url: '/api/v1/load-dashboards-list',
        data: {
            userID: userID,
        },
    });

    return response.data.body;
}

export async function loadDashboardFromDB(dashboardID: string) {
    const response = await axios({
        method: 'post',
        url: '/api/v1/load-dashboard',
        data: {
            dashboardID: dashboardID,
        },
    });

    return JSON.parse(response.data.body);
}

export async function saveDashboardToDB(userID: string, dashboardID: string, widgets: any[]) {
    await axios({
        method: 'post',
        url: '/api/v1/save-dashboard',
        data: {
            userID: userID,
            dashboardID: dashboardID,
            widgets: JSON.stringify(widgets),
        },
    });
}

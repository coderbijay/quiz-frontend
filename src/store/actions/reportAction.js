import { reportService } from "../../services/reportService";
import { alertType } from "./types/alertType";
import { reportType } from "./types/reportType";

export const getReports = (topicId) => async (dispatch) => {
  const res = await reportService.getReports(topicId);

  dispatch({
    type: reportType.GET_REPORTS_DETAIL,
    reports: res.data,
  });
};

export const deleteReport = (reportId) => async (dispatch) => {
  try {
    const res = await reportService.deleteReport(reportId);

    dispatch({
      type: reportType.REMOVE_REPORT,
      reports: Number(res.data),
    });

    dispatch({
      type: alertType.SUCCESS,
      message: "Report deleted successfully!!",
    });
  } catch (error) {
    dispatch({
      type: alertType.ERROR,
      errror: error.response.data.message,
    });
  }
};

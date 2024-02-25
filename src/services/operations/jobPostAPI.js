import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { jobEndpoints } from "../apis"

const {
    CREATE_JOB_API,
    GET_ALL_JOBS,
    JOB_DETAILS_API,
} = jobEndpoints








export const addJobPost = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", CREATE_JOB_API, data, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      })
      console.log("CREATE JOB POST API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Add Job Post Details")
      }
      toast.success("Job Post Details Added Successfully")
      result = response?.data?.data
    } catch (error) {
      console.log("CREATE JOB POST API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const getAllJobs = async () => {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("GET", GET_ALL_JOBS)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Jobs")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("GET_ALL_JOBS_API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const fetchJobDetails = async (jobId) => {
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector("POST", JOB_DETAILS_API, {
      jobId,
    })
    console.log("JOB_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
    
  } catch (error) {
    console.log("JOB_DETAILS_API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}
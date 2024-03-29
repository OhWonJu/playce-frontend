import axios from "axios";

export const API = axios.create({
  // baseURL: "http://localhost:4000/",
  timeout: 30000,
  headers: {
    accept: "apllication/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export async function _GET(endPoint: string) {
  try {
    const response = await API.get(endPoint);
    return response;
  } catch (e) {
    console.error(e);
    // return { ok: false };
  }
}

export async function _POST(endPoint: string, params: any) {
  try {
    const response = await API.post(endPoint, params);
    return response;
  } catch (e) {
    console.error(e);
  }
}

export async function _PATCH(endPoint: string, params: any) {
  try {
    const response = await API.patch(endPoint, params);
    return response;
  } catch (e) {
    console.error(e);
  }
}

// export async function _REFETCH(endPoint: string, setData: Function) {
//   try {
//     const response = await API.get(endPoint);
//     setData(response.data);
//   } catch (e) {
//     console.error(e);
//   }
// }

// export async function _GET(endPoint: string, setData?: Function) {
//   try {
//     const response = await fetch(endPoint, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const data = await response.json();
//     if (typeof setData === "function") {
//       setData(data.items);
//       return { ok: true };
//     } else return data;
//   } catch (e) {
//     console.error(e);
//     if (typeof setData === "function") {
//       return { ok: false };
//     } else return null;
//   }
// }

// export async function _POST(endPoint: string, params: any) {
//   try {
//     const response = await fetch(endPoint, {
//       method: "POST",
//       body: JSON.stringify(params),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     // fetch의 res 결과를 받기 위해서는 이렇게.
//     const data = await response.json();
//     return data;
//   } catch (e) {
//     console.error(e);
//   }
// }

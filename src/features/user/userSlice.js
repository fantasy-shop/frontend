import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

/* modules */
import { registerUser } from '../../features/user/api/registerUser';
import { loginUser } from '../../features/user/api/loginUser';
import { authUser } from '../../shared/api/authUser';
import { withdrawUser } from '../../features/user/api/withdrawUser';


export const initialState = {
  userData: {
    userPk: '',
    userName: '',
    password: '',
    email: '',
    phoneNumber: '',
    address: '',
    profileImageUrl: '',
    isAdmin: false
  },
  isAuth: false,
  isLogin: false,
  isLoading: false,
  error: null,
};

const setLoading = (state, loading) => {
  state.isLoading = loading;
  if (loading) state.error = null;
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser(state) {
      state.userData = initialState.userData;
      state.isAuth = false;
      state.isLogin = false;
      state.isLoading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {     // 비동기 액션 처리용 리듀서(ex createAsyncThunk)
    builder
      // 회원 가입 (pending-진행중, fulfilled-완료, rejected-거부)
      .addCase(registerUser.pending, (state) => {
        setLoading(state, true)
      })
      .addCase(registerUser.fulfilled, (state) => {
        setLoading(state, false);
        toast.success('회원가입을 성공했습니다.')
      })
      .addCase(registerUser.rejected, (state, action) => {
        setLoading(state, false);
        state.error = action.payload;
        toast.error('회원가입에 실패했습니다.');
      })

      // 로그인
      .addCase(loginUser.pending, (state) => {
        setLoading(state, true);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        setLoading(state, false);
        state.isAuth = true;
        toast.success('로그인을 성공했습니다.')
        localStorage.setItem('accessToken', action.payload.token);
        // console.log("Access Token:", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        setLoading(state, false);
        state.error = action.payload;
        toast.error('로그인을 실패했습니다.');
      })

      // 인증
      .addCase(authUser.pending, (state) => {
        setLoading(state, true);
      })
      .addCase(authUser.fulfilled, (state, action) => {
        setLoading(state, false);
        state.userData = action.payload;
        state.isAuth = true;
      })
      .addCase(authUser.rejected, (state, action) => {
        setLoading(state, false);
        state.error = action.payload;
        state.userData = initialState.userData;
        state.isAuth = false;
        localStorage.removeItem('accessToken');
      })

      // 회원 탈퇴
      .addCase(withdrawUser.pending, (state) => {
        setLoading(state, true);
      })
      .addCase(withdrawUser.fulfilled, (state, action) => {
        setLoading(state, false);
        toast.success('회원탈퇴를 성공했습니다.')
        // state.isAuth = false;
      })
      .addCase(withdrawUser.rejected, (state, action) => {
        setLoading(state, false);
        state.error = action.payload;
        console.log("action.payload", action.payload);
        toast.error('회원탈퇴를 실패했습니다.');
      })
  }
});

export default userSlice.reducer;

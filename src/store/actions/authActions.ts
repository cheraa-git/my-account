import axiosApp from '../../axiosApp'

export const postAuthData = () => async (dispatch: any) => {
  try {
    const response = await axiosApp.get('/users')
    const data = response.data
  } catch (e) {
    console.log('Error:', e)
  }
}

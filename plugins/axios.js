export default function ({
  $axios,
  redirect
}, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    baseURL: 'api.openweathermap.org/data/2.5/weather'
  })

  // Set baseURL to something different
  //api.setBaseURL('')

  // Inject to context as $api
  inject('api', api)
}

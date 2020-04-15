export default async function({ $auth, redirect, store }) {
    let user = $auth.loggedIn
    if (user) {
    } else {
      store.commit('SET_SNACKBAR', {
        text: 'Kindly login to access your devices.',
        color: 'error'
      })
      // alert('Kindly Log in to access Services')
  
      redirect('/login')
    }
  }
  
export const debounce = (fn, interval = 600) => {
    let timeout = null
    return function (){
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        fn.apply(this, arguments)
      }, interval)
    }
}
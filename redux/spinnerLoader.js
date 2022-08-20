  export function showLoader() {
    return {
        type: "SHOW_LOADER"
    }
  }

  export function hideLoader() {
    return {
        type: "HIDE_LOADER"
    }
  }

  function loaderReducer(loader = false, action) {
    switch (action.type) {
        case "SHOW_LOADER":
            return true
        case "HIDE_LOADER":
            return false
        default:
            return loader
    }
  }

  export default loaderReducer
import React, { Component } from 'react'

export default (loadCompoent, loading) => {
  return class AsyncComponet extends Component {
    constructor(props) {
      super(props)
      this.state = {
        C: null,
      }
      this.unmount = false
    }
    async componentDidMount() {
      const { default: C } = await loadCompoent()
      if (this.unmount) return
      this.setState({ C })
    }
    componentWillUnmount() {
      this.unmount = true
    }
    render() {
      const { C } = this.state
      return C ? <C {...this.props} /> : loading
    }
  }
}

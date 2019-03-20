import React, {Component} from 'react'

export default class AddressNearby extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      list: []
    }
  }
  render() {
    return (
      <div>
        address search
      </div>
    )
  }
}
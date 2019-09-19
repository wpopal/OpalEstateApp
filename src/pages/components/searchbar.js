import React from 'react';
import {SearchBar} from 'react-native-elements';

export default class App extends React.Component {
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({search});
  };

  render() {
    const {search} = this.state;
    return (
      <SearchBar
        lightTheme={true}
        inputContainerStyle={{width: '100%'}}
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
        value={search}
      />
    );
  }
}

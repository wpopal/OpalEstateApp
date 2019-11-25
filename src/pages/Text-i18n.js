import {connect} from 'react-redux';
import I18n from '../i18n/i18n';
import React, {Component} from 'react';
import {Text} from 'react-native';
import {bindActionCreators} from 'redux';
import {Creators as i18nCreators} from '../store/ducks/i18n';

class AppText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      i18n: I18n,
    };
  }

  componentWillMount() {
    const language = this.props.i18nMain.i18nKey;
    if (language) {
      this.setMainLocaleLanguage(language);
    }
  }

  componentWillReceiveProps = nextProps => {
    const language = nextProps.i18nMain.i18nKey;
    if (language) {
      this.setMainLocaleLanguage(language);
    }
  };

  componentDidMount(): void {}

  setMainLocaleLanguage = language => {
    let i18n = this.state.i18n;
    i18n.locale = language;
    this.setState({i18n: i18n});
  };

  render() {
    const {i18nKey, style} = this.props;
    const {i18n} = this.state;
    return (
      <Text style={style}>
        {i18nKey ? i18n.t(i18nKey) : this.props.children}
      </Text>
    );
  }
}

const mapStateToProps = state => ({
  i18nMain: state.i18n,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(i18nCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppText);

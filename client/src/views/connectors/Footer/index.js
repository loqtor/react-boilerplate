import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import actionsApp from '../../../redux/modules/app/actions';

import { Footer } from '../../components/Footer';

const mapDispatchToProps = dispatch => ({
  toggleSheet(activeContent, heading) {
    return dispatch(actionsApp.toggleSheet(activeContent, heading));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(injectIntl(Footer));

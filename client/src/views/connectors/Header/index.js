import { connect } from 'react-redux';

import actionsApp from '../../../redux/modules/app/actions';
import selectorsApp from '../../../redux/modules/app/selectors';

import { Header } from '../../components/Header';

const mapStateToProps = state => ({
  isMenuOpen: selectorsApp.isMenuOpen(state),
});

const mapDispatchToProps = dispatch => ({
  toggleMenu() {
    return dispatch(actionsApp.toggleMenu());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

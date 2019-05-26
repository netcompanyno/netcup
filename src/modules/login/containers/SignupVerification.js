import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { parse } from 'query-string';
import { replace, LOGIN } from '../../../routing';
import { registerUser } from '../services/auth-service';
import SignupVerification from '../components/SignupVerification';
import { error, dismissErrorMessage } from '../signup';

const extractId = queryString => parse(queryString).id;

export default withRouter(connect(
  (state, ownProps) => ({
    userId: extractId(ownProps.location.search),
    showErrorMessage: state.signup.showErrorMessage,
    errorMessage: state.signup.errorMessage,
  }),
  (dispatch, ownProps) => ({
    finishRegistration: async userId => {
      console.log('Finishing up registration...');
      try {
        await registerUser(userId);
        dispatch(dismissErrorMessage);
        console.log('Done. Redirecting to login page...');
        return replace(LOGIN, ownProps.history);
      } catch (e) {
        return dispatch(error(e));
      }
    },
  })
)(SignupVerification));

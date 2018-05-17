import { combineReducers } from 'redux';
import userAccountReducer from './Account/AccountModule';
import commentReducer from './Comment/CommentModule';
import profileReducer from './Profile/ProfileModule';
import profileFormReducer from './Profile/ProfileFormModule';
import promoReducer from './Promo/PromoCodeFormModule';
import redeemRewardReducer from './Account/RedeemModule';


export default combineReducers({
  account: userAccountReducer,
  comment: commentReducer,
  profile: profileReducer,
  profileForm: profileFormReducer,
  promo: promoReducer,
  redeem: redeemRewardReducer,
});
import * as fromSelectors from '../selectors/user.selector';
import { CommonService } from '../../services/common.service';
import { Statuses } from '../../shared/app.constants';
import { UserProfile } from '../../models/user.model';


interface UserState {
  data: UserProfile[];
  status: Statuses
}

var initialState: UserState = {
  data: null,
  status: Statuses.EMPTY
};

describe('Selectors', () => {
  it('should be loading', () => {
    initialState = { data: null, status: Statuses.LOADING }
    const result = fromSelectors.isLoading.projector(initialState);
    expect(result).toEqual(true);
  });

  it('should be success', () => {
    initialState = { data: null, status: Statuses.SUCCESS }
    const result = fromSelectors.isSuccess.projector(initialState);
    expect(result).toEqual(true);
  });

  it('should be error', () => {
    initialState = { data: null, status: Statuses.ERROR }
    const result = fromSelectors.isError.projector(initialState);
    expect(result).toEqual(true);
  });
});

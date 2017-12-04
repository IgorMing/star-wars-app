import React from 'react';
import renderer from 'react-test-renderer';

import Header from './Header';

describe('Header component tests', () => {
  const mockedImage = 'http://geekycentral.com/wp-content/uploads/2017/09/react-native.png';
  const mockedFn = jest.fn();

  it('should render without crashing', () => {
    const wrapper = renderer.create(<Header />).toJSON();

    expect(wrapper).toBeTruthy();
  });

  it('should render with right icon', () => {
    const wrapper = renderer
      .create(<Header rightIcon={mockedImage} />)
      .toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it('should render with a left action and without right icon', () => {
    const wrapper = renderer
      .create(<Header leftAction={mockedFn} />)
      .toJSON();

    expect(wrapper).toMatchSnapshot();
  });

  it('should render with a left action and with right icon', () => {
    const wrapper = renderer
      .create(<Header leftAction={mockedFn} rightIcon={mockedImage} />)
      .toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});


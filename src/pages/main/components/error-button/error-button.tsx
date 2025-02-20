import { Component } from 'react';
import { Button } from '../../../../components/shared/button/button';

type Props = object;

interface State {
  hasError: boolean;
}
export class ErrorButton extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  throwError = () => {
    this.setState({ hasError: true });
  };

  render() {
    const { hasError } = this.state;
    if (hasError) {
      throw new Error("It seems like you've broken something!");
    }

    return <Button onClick={this.throwError}>Throw Error</Button>;
  }
}

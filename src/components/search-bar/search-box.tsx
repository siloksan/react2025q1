import React, { ComponentProps } from 'react';
import styles from './search-box.module.scss';
import loupe from './assets/search-icon.svg';
import StorageService from '../../api/utils/storage-service';

interface State {
  searchTerm: string;
}

interface Props extends ComponentProps<'div'> {
  updateData: (name: string) => void;
}

export default class SearchBox extends React.Component<Props, State> {
  private storageService = new StorageService('searchTerm');

  constructor(props: Props) {
    super(props);
    this.state = {
      searchTerm: this.storageService.getData() ?? '',
    };
  }

  componentDidMount(): void {
    const { searchTerm } = this.state;
    const { updateData } = this.props;
    updateData(searchTerm.trim());
  }

  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.storageService.setData(value);
    this.setState({ searchTerm: value });
  };

  handleSubmit = () => {
    const { searchTerm } = this.state;
    const { updateData } = this.props;
    updateData(searchTerm.trim());
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.handleSubmit();
    }
  };

  render() {
    const { searchTerm } = this.state;
    const { className = '' } = this.props;

    return (
      <div className={`${styles.container} ${className}`}>
        <div className={styles.form}>
          <input
            value={searchTerm || ''}
            onChange={this.handleInput}
            onKeyDown={this.handleKeyDown}
            type="text"
            className={styles.input}
            placeholder="Search"
          />
          <button
            className={styles.button}
            aria-label="Search"
            type="submit"
            onClick={this.handleSubmit}
          >
            <img src={loupe} alt="loupe icon" />
          </button>
        </div>
      </div>
    );
  }
}

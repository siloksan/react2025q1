import { PureComponent } from 'react';

import styles from './SpaceCraftDetails.module.scss';
import { Spacecraft } from '../../api/types';

interface Props {
  cardInfo: Spacecraft;
}

export default class SpaceCraftDetails extends PureComponent<Props> {
  render() {
    const {
      cardInfo: {
        name,
        owner,
        operator,
        dateStatus = 'unknown',
        spacecraftClass,
        status = 'unknown',
      },
    } = this.props;

    const ownerName = owner ? owner.name : 'unknown';
    const operatorName = operator ? operator.name : 'unknown';
    const spacecraftClassName = spacecraftClass
      ? spacecraftClass.name
      : 'unknown';

    return (
      <li className={styles.container}>
        <div className="ship-details">
          <h2>
            <strong>Name:</strong> {name}
          </h2>
          <p>
            <strong>Owner:</strong> {ownerName}
          </p>
          <p>
            <strong>Date of creation:</strong> {dateStatus}
          </p>
          <p>
            <strong>Class:</strong> {spacecraftClassName}
          </p>
          <p>
            <strong>Managed By:</strong> {operatorName}
          </p>
          <p>
            <strong>Status:</strong> {status}
          </p>
        </div>
      </li>
    );
  }
}

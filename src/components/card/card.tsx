import { SerializeUserData } from '../../store/users-data-slice';

import styles from './card.module.scss';

export function Card(user: SerializeUserData) {
  const { image, age, name, country, email, gender, password } = user;
  return (
    <>
      <div className={styles.image_wrapper}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.details}>
        <h3>
          Name: <strong>{name}</strong>
        </h3>
        <div>
          Age: <strong>{age}</strong>
        </div>
        <div>
          Country: <strong>{country}</strong>
        </div>
        <div>
          Email: <strong>{email}</strong>
        </div>
        <div>
          Password: <strong>{password}</strong>
        </div>
        <div>
          Gender: <strong>{gender}</strong>
        </div>
      </div>
    </>
  );
}

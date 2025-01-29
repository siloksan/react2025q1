// import React, { ComponentProps } from 'react';
// import loupe from './assets/search-icon.svg';
// import StorageService from '../../api/utils/storage-service';

// import styles from './search-box.module.scss';

// interface State {
//   searchTerm: string;
// }

// interface Props extends ComponentProps<'div'> {
//   updateData: (name: string) => void;
// }
// export function SearchBox ({ updateData }: Props) {
//     const [value, setValue] = useState(searchTerm);

//   private readonly storageService = new StorageService('searchTerm');

//   constructor(props: Props) {
//     super(props);
//     this.state = {
//       searchTerm: this.storageService.getData() ?? '',
//     };
//   }

//   componentDidMount(): void {
//     const { searchTerm } = this.state;
//     const { updateData } = this.props;
//     updateData(searchTerm.trim());
//   }

//   handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { value } = event.target;
//     this.storageService.setData(value);
//     this.setState({ searchTerm: value });
//   };

//   handleSubmit = () => {
//     const { searchTerm } = this.state;
//     const { updateData } = this.props;
//     updateData(searchTerm.trim());
//   };

//   handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === 'Enter') {
//       this.handleSubmit();
//     }
//   };

//   render() {
//     const { searchTerm } = this.state;
//     const { className = '' } = this.props;

//     return (
//       <div className={`${styles.container} ${className}`}>
//         <div className={styles.form}>
//           <input
//             value={searchTerm || ''}
//             onChange={this.handleInput}
//             onKeyDown={this.handleKeyDown}
//             type="text"
//             className={styles.input}
//             placeholder="Search"
//           />
//           <button
//             className={styles.button}
//             aria-label="Search"
//             type="submit"
//             onClick={this.handleSubmit}
//           >
//             <img src={loupe} alt="loupe icon" />
//           </button>
//         </div>
//       </div>
//     );
//   }
// }

// // export default function SearchBox({ updateData, searchTerm, setStorageSearchParams }: Props) {
// //   const [value, setValue] = useState(searchTerm);
// //   const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
// //     setValue(event.target.value);
// //   };

// //   const handleSubmit = () => {
// //     setStorageSearchParams('name', value.trim());
// //     updateData(value.trim());
// //   };

// //   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
// //     if (event.key === 'Enter') {
// //       handleSubmit();
// //     }
// //   };

// //   return (
// //     <div className={styles.container}>
// //       <div className={styles.form}>
// //         <input
// //           value={value}
// //           onChange={handleInput}
// //           onKeyDown={handleKeyDown}
// //           type="text"
// //           className={styles.input}
// //           placeholder="Search"
// //         />
// //         <button className={styles.button} aria-label="Search" type="submit" onClick={() => handleSubmit()}>
// //           <img src={loupe} alt="loupe icon" />
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

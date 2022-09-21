
export const SELECT_OPTIONS_REGION = 'select_options_region';
export const SELECT_OPTIONS_RATING = 'select_options_rating';
export const SELECT_OPTIONS_STATUS = 'select_options_status';
export const SELECT_COLUMNS = 'select_columns';
export const GET_OPTIONS = 'get_options';
export const OPEN_POPUP = 'open_popup';
export const APPLY_COLUMNS = 'apply_columns';
export const CLEAR_CHANGES_COLUMNS = 'clear_changes_columns';
export const CLEAR_CHANGES_FILTER = 'clear_changes_filter';


const defaultState = {
  selectedOptionsRegion: [],
  selectedOptionsRating: [],
  selectedOptionsStatus: [],
  appliedOptionsRegion: [],
  appliedOptionsRating: [],
  appliedOptionsStatus: [],
  selectedColumns: [
    'Audit number',
    'Audit name',
    'Audit region',
    'Document status',
    'Audit risk rating',
    'Audit lead'
  ],
  appliedColumns: [
    'Audit number',
    'Audit name',
    'Audit region',
    'Document status',
    'Audit risk rating',
    'Audit lead'
  ],
  popUpIsOpen: false,
  popUpColIsOpen: false,
};

export const storeReducer = (
  state = defaultState, action,
) => {
  switch (action.type) {

    case SELECT_OPTIONS_REGION:
      let options = [...state.selectedOptionsRegion];

     if (options.includes(action.payload)) {
      const filtered = options.filter(el => el !== action.payload)
      return {...state, selectedOptionsRegion: [...filtered]}
     } else {
      options.push(action.payload);
      return {...state, selectedOptionsRegion: [...options]}
     }

     case SELECT_OPTIONS_RATING:
      let optionsRating = [...state.selectedOptionsRating];

     if (optionsRating.includes(action.payload)) {
      const filtered = optionsRating.filter(el => el !== action.payload)
      return {...state, selectedOptionsRating: [...filtered]}
     } else {
      optionsRating.push(action.payload);
      return {...state, selectedOptionsRating: [...optionsRating]}
     }

     case SELECT_OPTIONS_STATUS:
      let optionsStatus = [...state.selectedOptionsStatus];

     if (optionsStatus.some(el => el === action.payload)) {
      const filtered = optionsStatus.filter(el => el !== action.payload)
      return {...state, selectedOptionsStatus: [...filtered]}
     } else {
      optionsStatus.push(action.payload);
      return {...state, selectedOptionsStatus: [...optionsStatus]}
     }

     case SELECT_COLUMNS:
      let columns = [...state.selectedColumns];

     if (columns.includes(action.payload)) {
      const filtered = columns.filter(el => el !== action.payload)
      return {...state, selectedColumns: [...filtered]}
     } else {
      columns.push(action.payload);
      return {...state, selectedColumns: [...columns]}
     }

     case CLEAR_CHANGES_COLUMNS:
      return {
        ...state,
        selectedColumns: [
          'Audit number',
          'Audit name',
          'Audit region',
          'Document status',
          'Audit risk rating',
          'Audit lead'
        ],
      }

    case CLEAR_CHANGES_FILTER:
      return {
        ...state,
        selectedOptionsRegion: [],
        selectedOptionsRating: [],
        selectedOptionsStatus: [],
      }

     case APPLY_COLUMNS:
      return {
        ...state,
        appliedColumns: [...state.selectedColumns]
      }

    case GET_OPTIONS:
      return {
        ...state, 
        appliedOptionsRegion: [...state.selectedOptionsRegion],
        appliedOptionsRating: [...state.selectedOptionsRating],
        appliedOptionsStatus: [...state.selectedOptionsStatus]
      }

    case OPEN_POPUP:
      return {...state, popUpIsOpen: !state.popUpIsOpen}


    default:
      return state;
  }
};
/* eslint-disable prefer-object-spread */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/static-property-placement */
/* eslint-disable class-methods-use-this */
// eslint-disable-next-line max-classes-per-file
import React, {
  ChangeEventHandler,
  Component,
  KeyboardEvent,
  PureComponent,
  KeyboardEventHandler,
} from 'react';

// keyCode constants
const BACKSPACE = 8;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const DELETE = 46;
const SPACEBAR = 32;

// Doesn't really check if it's a style Object
// Basic implementation to check if it's not a string
// of classNames and is an Object
// TODO: Better implementation
const isStyleObject = (obj: any) => typeof obj === 'object';

interface SingOtpInputPros {
  placeholder?: string;
  separator?: React.ReactNode;
  isLastChild?: boolean;
  inputStyle?: React.CSSProperties | string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
  onPaste: any;
  onFocus: any;
  onBlur: any;
  onInput: any;
  focus?: boolean;
  hasErrored?: boolean;
  isDisabled?: boolean;
  errorStyle?: React.CSSProperties | string;
  focusStyle?: React.CSSProperties | string;
  disabledStyle?: React.CSSProperties | string;
  shouldautofocus?: boolean;
  isInputNum?: boolean;
  index?: number;
  value?: string | number;
  className?: string;
  isinputsecure?: boolean;
}

class SingleOtpInput extends PureComponent<SingOtpInputPros, any> {
  static defaultProps = {
    placeholder: null,
    separator: '-',
    isLastChild: false,
    inputStyle: {},
    focus: false,
    hasErrored: false,
    isDisabled: false,
    errorStyle: {},
    focusStyle: {},
    disabledStyle: {},
    shouldautofocus: false,
    isInputNum: false,
    index: null,
    value: '',
    className: '',
    isinputsecure: false,
  };

  input: any;

  constructor(props: any) {
    super(props);
    this.input = React.createRef();
  }

  // Focus on first render
  // Only when shouldAutoFocus is true
  componentDidMount() {
    const { focus, shouldautofocus } = this.props;
    const { current: inputEl } = this.input;

    if (inputEl && focus && shouldautofocus) {
      inputEl.focus();
    }
  }

  componentDidUpdate(prevProps: SingOtpInputPros) {
    const { focus } = this.props;
    const { current: inputEl } = this.input;

    // Check if focusedInput changed
    // Prevent calling function if input already in focus
    if (prevProps.focus !== focus && inputEl && focus) {
      inputEl.focus();
      inputEl.select();
    }
  }

  getClasses = (...classes: any[]) =>
    classes.filter((c) => !isStyleObject(c) && c !== false).join(' ');

  getType = () => {
    const { isinputsecure, isInputNum } = this.props;

    if (isinputsecure) {
      return 'password';
    }

    if (isInputNum) {
      return 'tel';
    }

    return 'text';
  };

  render() {
    const {
      placeholder,
      separator,
      isLastChild,
      inputStyle,
      focus,
      isDisabled,
      hasErrored,
      errorStyle,
      focusStyle,
      disabledStyle,
      isInputNum,
      index,
      value,
      className,
      ...rest
    } = this.props;

    return (
      <div
        className={className}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <input
          aria-label={`${
            index === 0 ? 'Please enter verification code. ' : ''
          }${isInputNum ? 'Digit' : 'Character'} ${index! + 1}`}
          autoComplete="off"
          style={Object.assign(
            { width: '1em', textAlign: 'center' },
            isStyleObject(inputStyle) && inputStyle,
            focus && isStyleObject(focusStyle) && focusStyle,
            isDisabled && isStyleObject(disabledStyle) && disabledStyle,
            hasErrored && isStyleObject(errorStyle) && errorStyle
          )}
          placeholder={placeholder}
          className={this.getClasses(
            inputStyle,
            focus && focusStyle,
            isDisabled && disabledStyle,
            hasErrored && errorStyle
          )}
          type={this.getType()}
          maxLength={1}
          ref={this.input}
          disabled={isDisabled}
          value={value || ''}
          {...rest}
        />
        {!isLastChild && separator}
      </div>
    );
  }
}

class OtpInput extends Component<
  {
    value?: string | number;
    numInputs?: number;
    placeholder?: string | number;
    onChange?: Function;
    isInputNum?: boolean;
    isDisabled?: boolean;
    inputStyle?: React.CSSProperties | string;
    focusStyle?: React.CSSProperties | string;
    separator?: React.ReactNode;
    disabledStyle?: React.CSSProperties | string;
    hasErrored?: boolean;
    errorStyle?: React.CSSProperties | string;
    shouldautofocus?: boolean;
    isinputsecure?: boolean;
    containerStyle?: React.CSSProperties | string;
    className?: string;
  },
  any
> {
  static defaultProps = {
    numInputs: 4,
    onChange: (otp: string | number) => console.log(otp),
    isDisabled: false,
    shouldautofocus: false,
    value: '',
    isinputsecure: false,
    isInputNum: false,
    containerStyle: {},
  };

  // eslint-disable-next-line react/state-in-constructor
  state = {
    activeInput: 0,
  };

  getOtpValue = () =>
    this.props.value ? this.props.value.toString().split('') : [];

  getPlaceholderValue = () => {
    const { placeholder, numInputs } = this.props;

    if (typeof placeholder === 'string') {
      if (placeholder.length === numInputs) {
        return placeholder;
      }

      if (placeholder.length > 0) {
        console.error(
          'Length of the placeholder should be equal to the number of inputs.'
        );
      }
    }
  };

  // Helper to return OTP from input
  handleOtpChange = (otp: Array<string | number>) => {
    const { onChange } = this.props;
    const otpValue = otp.join('');

    if (onChange) onChange(otpValue);
  };

  isInputValueValid = (value: string | number) => {
    const isTypeValid = this.props.isInputNum
      ? !Number.isNaN(parseInt(value.toString(), 10))
      : typeof value === 'string';

    return (
      isTypeValid && typeof value === 'string' && value.trim().length === 1
    );
  };

  // Focus on input by index
  focusInput = (input: number) => {
    const { numInputs } = this.props;
    const activeInput = Math.max(Math.min(numInputs! - 1, input), 0);

    this.setState({ activeInput });
  };

  // Focus on next input
  focusNextInput = () => {
    const { activeInput } = this.state;
    this.focusInput(activeInput + 1);
  };

  // Focus on previous input
  focusPrevInput = () => {
    const { activeInput } = this.state;
    this.focusInput(activeInput - 1);
  };

  // Change OTP value at focused input
  changeCodeAtFocus = (value: string) => {
    const { activeInput } = this.state;
    const otp = this.getOtpValue();
    otp[activeInput] = value[0];

    this.handleOtpChange(otp);
  };

  // Handle pasted OTP
  handleOnPaste = (e: ClipboardEvent) => {
    e.preventDefault();

    const { activeInput } = this.state;
    const { numInputs, isDisabled } = this.props;

    if (isDisabled) {
      return;
    }

    const otp = this.getOtpValue();
    let nextActiveInput = activeInput;

    // Get pastedData in an array of max size (num of inputs - current position)
    const pastedData = e
      .clipboardData!.getData('text/plain')
      .slice(0, numInputs! - activeInput)
      .split('');

    // Paste data from focused input onwards
    for (let pos = 0; pos < numInputs!; ++pos) {
      if (pos >= activeInput && pastedData.length > 0) {
        otp[pos] = pastedData.shift()!;
        nextActiveInput++;
      }
    }

    this.setState({ activeInput: nextActiveInput }, () => {
      this.focusInput(nextActiveInput);
      this.handleOtpChange(otp);
    });
  };

  handleOnChange = (e: any) => {
    const { value } = e.target;

    if (this.isInputValueValid(value)) {
      this.changeCodeAtFocus(value);
    }
  };

  // Handle cases of backspace, delete, left arrow, right arrow, space
  handleOnKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === BACKSPACE || e.key === 'Backspace') {
      e.preventDefault();
      this.changeCodeAtFocus('');
      this.focusPrevInput();
    } else if (e.keyCode === DELETE || e.key === 'Delete') {
      e.preventDefault();
      this.changeCodeAtFocus('');
    } else if (e.keyCode === LEFT_ARROW || e.key === 'ArrowLeft') {
      e.preventDefault();
      this.focusPrevInput();
    } else if (e.keyCode === RIGHT_ARROW || e.key === 'ArrowRight') {
      e.preventDefault();
      this.focusNextInput();
    } else if (
      e.keyCode === SPACEBAR ||
      e.key === ' ' ||
      e.key === 'Spacebar' ||
      e.key === 'Space'
    ) {
      e.preventDefault();
    }
  };

  // The content may not have changed, but some input took place hence change the focus
  handleOnInput = (e: any) => {
    if (this.isInputValueValid(e.target.value)) {
      this.focusNextInput();
    }
    // This is a workaround for dealing with keyCode "229 Unidentified" on Android.
    else if (!this.props.isInputNum) {
      const { nativeEvent } = e;

      if (
        nativeEvent.data === null &&
        nativeEvent.inputType === 'deleteContentBackward'
      ) {
        e.preventDefault();
        this.changeCodeAtFocus('');
        this.focusPrevInput();
      }
    }
  };

  renderInputs = () => {
    const { activeInput } = this.state;
    const {
      numInputs,
      inputStyle,
      focusStyle,
      separator,
      isDisabled,
      disabledStyle,
      hasErrored,
      errorStyle,
      shouldautofocus,
      isInputNum,
      isinputsecure,
      className,
    } = this.props;

    const inputs = [];
    const otp = this.getOtpValue();
    const placeholder = this.getPlaceholderValue();

    for (let i = 0; i < numInputs!; i++) {
      inputs.push(
        <SingleOtpInput
          placeholder={placeholder && placeholder[i]}
          key={i}
          index={i}
          focus={activeInput === i}
          value={otp && otp[i]}
          onChange={this.handleOnChange}
          onKeyDown={this.handleOnKeyDown}
          onInput={this.handleOnInput}
          onPaste={this.handleOnPaste}
          onFocus={(e: any) => {
            this.setState({ activeInput: i });
            e.target.select();
          }}
          onBlur={() => this.setState({ activeInput: -1 })}
          separator={separator}
          inputStyle={inputStyle}
          focusStyle={focusStyle}
          isLastChild={i === numInputs! - 1}
          isDisabled={isDisabled}
          disabledStyle={disabledStyle}
          hasErrored={hasErrored}
          errorStyle={errorStyle}
          shouldautofocus={shouldautofocus}
          isInputNum={isInputNum}
          isinputsecure={isinputsecure}
          className={className}
        />
      );
    }

    return inputs;
  };

  render() {
    const { containerStyle } = this.props;

    return (
      <div
        style={Object.assign(
          { display: 'flex' },
          isStyleObject(containerStyle) && containerStyle
        )}
        className={
          !isStyleObject(containerStyle) ? (containerStyle as string) : ''
        }
      >
        {this.renderInputs()}
      </div>
    );
  }
}

export default OtpInput;

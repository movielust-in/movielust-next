import { PlayerSpinner } from '../../assets';

function Spinner({ width }: { width?: string | number }) {
    return <img src={PlayerSpinner} alt="loading" width={width} />;
}

export default Spinner;

Spinner.defaultProps = {
    width: 'auto',
};

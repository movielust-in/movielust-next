import { useState, useEffect } from 'react';
import styled from '@emotion/styled';

interface YearFilterProps {
    years: any[];
}

function YearFilter({ years }: YearFilterProps) {
    const [yearDropDownOpen, setYearDropDownOpen] = useState(false);
    // const [loading, setIsLoading] = useState(true);
    const [sortedYear, setSortedYear] = useState<any[]>([]);

    useEffect(() => {
        setSortedYear(years);

        // eslint-disable-next-line
    }, []);

    return (
        <Filters>
            <Container>
                <Button
                    onClick={() => {
                        setYearDropDownOpen((state) => !state);
                    }}
                >
                    Sort
                </Button>

                <DropList open={yearDropDownOpen}>
                    {sortedYear.sort().map((year) => (
                        <Item
                            role="presentation"
                            key={year}
                            onClick={() => {}}
                            style={{
                                backgroundColor: year.includes(year) ? 'silver' : '',
                                borderRadius: year.includes(year) ? '5px' : '',
                                color: year.includes(year) ? 'black' : '',
                            }}
                        >
                            <div>{year}</div>
                        </Item>
                    ))}
                </DropList>
            </Container>
        </Filters>
    );
}

export default YearFilter;
const Filters = styled.div`
    display: flex;
    justify-content: right;
`;
const Container = styled.div`
    position: relative;
`;

const Button = styled.button`
    background-color: #090c14;
    background-image: linear-gradient(315deg, #090c14 0%, #031d30 79%);
    border: 1px solid silver;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    font-size: 1.3rem;
    font-weight: 400;
    margin-right: 7rem;
    padding: 7px 12px 7px 12px;
    text-align: center;

    @media (max-width: 724px) {
        margin-top: 10px;
        margin-right: 12px;
        font-size: 1rem;
        padding: 7px 10px 7px 10px;
        text-align: center;
    }

    @media (min-width: 724px) {
        &:hover + ul,
        & + ul:hover {
            display: block;
            opacity: 1;
            min-height: 100px;
            padding: 5px;
            text-align: center;
            li {
                display: block;
            }
        }
    }
`;

const DropList = styled.ul<{ open: boolean }>`
    background-image: linear-gradient(315deg, #090c14 0%, #031d30 79%);
    border: 1px solid silver;
    border-radius: 8px;
    display: none;
    list-style: none;
    min-height: ${(props) => (props.open ? '150px' : 0)};
    min-width: 100px;
    opacity: ${(props) => (props.open ? 0.95 : 0)};
    overflow-y: scroll;
    position: absolute;
    text-align: center;
    transform: translatey(-15px) translateX(-53px);
    transition: opacity 200ms;
    z-index: 5;
    li {
        display: ${(props) => (props.open ? 'flex' : 'none')};
    }
    &::-webkit-scrollbar {
        display: none;
    }

    @media (max-width: 724px) {
        display: ${(props) => (props.open ? 'flex' : 'none')};
        display: block;
        text-align: center;
        max-height: 350px;
        padding: 16px;
    }
`;
const Item = styled.li`
    border-bottom: 1px solid transparent;
    cursor: pointer;
    margin: 10px 0;
    padding: 2px 31px;
    transition: all 250ms;
    user-select: none;

    &:hover {
        background-color: gray;
    }
    @media (max-width: 724px) {
        padding: 1px 10px 0 10px;
    }
`;

import { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { FaAngleDoubleDown } from 'react-icons/fa';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import { SORT_OPTIONS } from '../../../../lib/tmdb/constants';

// interface SortByProps {
//   type: string;
// }

function SortBy() {
  const [sortDropDownOpen, setSortDropDownOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedSortBy = searchParams?.get('sortBy');

  const setSortOption = useCallback(
    (option: string) => {
      if (selectedSortBy === option || !searchParams) return;
      const params = new URLSearchParams(searchParams);
      params.set('sortBy', option);

      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams, selectedSortBy]
  );

  return (
    <Container>
      <Button
        onClick={() => {
          setSortDropDownOpen((state) => !state);
        }}
      >
        Sort By <FaAngleDoubleDown />
      </Button>

      <DropList open={sortDropDownOpen}>
        {SORT_OPTIONS.map((sortOption) => (
          <Item
            role="presentation"
            onClick={() => {
              setSortOption(sortOption.value);
              setSortDropDownOpen(false);
            }}
            key={sortOption.value}
            style={{
              backgroundColor:
                selectedSortBy === sortOption.value ? 'silver' : '',
              borderRadius: selectedSortBy === sortOption.value ? '5px' : '',
              color: selectedSortBy === sortOption.value ? 'black' : '',
            }}
          >
            {/* <button type="button" onClick={() => setSortOption(sortOption.value)}> */}
            {sortOption.label} {/* </button> */}
          </Item>
        ))}
      </DropList>
    </Container>
  );
}

export default SortBy;

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
  font-size: 1rem;
  font-weight: 400;
  margin-right: 7rem;
  padding: 7px 12px 7px 12px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 724px) {
    margin-top: 10px;
    margin-right: 12px;
    font-size: 1rem;
    padding: 7px 10px 7px 10px;
    text-align: left;
  }

  @media (min-width: 724px) {
    &:hover + ul,
    & + ul:hover {
      display: block;
      opacity: 1;
      min-height: 100px;
      padding: 5px;
      text-align: left;
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
  text-align: left;
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
    text-align: left;
    max-height: 350px;
    padding: 16px;
  }
`;
const Item = styled.div`
  border-bottom: 1px solid transparent;
  cursor: pointer;
  margin: 10px 0;
  padding: 2px 31px;
  transition: all 250ms;
  user-select: none;
  display: flex;
  flex-direction: row;
  gap: 12px;
  justify-content: space-between;
  white-space: nowrap;
  transition: all 500ms ease 0s;
  &:hover {
    background-color: gray;
  }
  @media (max-width: 724px) {
    padding: 1px 10px 0 10px;
  }
`;

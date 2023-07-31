import { FC, memo } from "react";
import { useRouter } from "next/router";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

import styled from "styled-components";
import tw from "twin.macro";
import { Cross, Search } from "@components/icons";
import { Input, useUI } from "@components/ui";
import useTheme from "@lib/client/hooks/useTheme";
import { NAV_HEIGHT } from "constants/constants";
import { SearchProps } from "../SearchDropDownController";

interface SearchbarProps {
  className?: string;
  id?: string;
  register: UseFormRegister<SearchProps>;
  handleSubmit: UseFormHandleSubmit<SearchProps>;
  watch: UseFormWatch<SearchProps>;
  clearHandler: Function;
  onSubmit: (data: SearchProps) => void;
  onInvaild: (data: FieldErrors) => void;
  handleFocus: Function;
  handleBlur: Function;
}

const Searchbar: FC<SearchbarProps> = ({
  className,
  id = "search",
  register,
  handleSubmit,
  watch,
  clearHandler,
  onSubmit,
  onInvaild,
  handleFocus,
  handleBlur,
}) => {
  const router = useRouter();
  const theme = useTheme();
  const { closeDropDown } = useUI();

  // useEffect(() => {
  //   router.prefetch("/search");
  // }, [router]);

  // const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   e.preventDefault()

  //   if (e.key === 'Enter') {
  //     const q = e.currentTarget.value

  //     router.push(
  //       {
  //         pathname: `/search`,
  //         query: q ? { q } : {},
  //       },
  //       undefined,
  //       { shallow: true }
  //     )
  //   }
  // }

  return (
    <Container>
      <form
        onSubmit={handleSubmit(onSubmit, onInvaild)}
        className="__searchBar relative flex w-[100%] md:w-[65%] xl:w-[45%] pr-9 md:pr-0 items-center"
      >
        <label className="hidden" htmlFor={id}>
          Search
        </label>
        <Input
          register={register("keyword", {
            required: "Keyword is required",
          })}
          id={id}
          type="text"
          className="px-10 shadow-none"
          style={{ backgroundColor: "transparent" }}
          placeholder="Search for products..."
          required={false}
          onFocus={e => handleFocus(e)}
          onBlur={e => handleBlur(e)}
        />
        {/* <Input
          {...register("keyword", {
            required: "Keyword is required",
          })}
          id={id}
          type="text"
          placeholder="Search for products..."
          // defaultValue={router.query.q}
          // onKeyUp={handleKeyUp}
        /> */}
        <div className="absolute inset-y-0 flex items-center py-1.5 px-3 left-0">
          <Search className="h-5 w-5" />
        </div>
        {watch("keyword") && (
          <div className="absolute inset-y-0 flex items-center right-2 pr-9 md:pr-0">
            <button
              className="bg-black bg-opacity-10 hover:bg-opacity-30 p-1 rounded-full"
              onClick={() => clearHandler()}
              type="button"
            >
              <Cross
                className="h-3 w-3"
                strokeWidth={2}
                stroke={theme.white_primary}
              />
            </button>
          </div>
        )}
      </form>
      <div className="absolute inset-y-0 flex items-center px-1.5 right-2.5 md:right-5">
        <button className="" onClick={() => closeDropDown()}>
          <Cross className="h-6 w-6" />
        </button>
      </div>
    </Container>
  );
};

export default memo(Searchbar);

const Container = styled.div<any>`
  ${tw`relative z-30 top-0 left-0 flex px-5 w-full justify-start md:justify-center`};
  height: ${NAV_HEIGHT}px;
`;

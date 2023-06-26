import { Container } from "@components/ui";
import React from "react";
import { SectionHeaderText, SymbolText } from "src/styles/GlobalStyle";

const ExploreView = () => {
  return (
    <Container className="space-y-8">
      <SymbolText>Explore Music</SymbolText>

      <section>
        <SectionHeaderText>New arrival</SectionHeaderText>
      </section>

      <section>
        <SectionHeaderText>Popular chart</SectionHeaderText>
      </section>

      <section>
        <SectionHeaderText>Mood & Genre</SectionHeaderText>
      </section>

      <section>
        <SectionHeaderText>Recommened for you</SectionHeaderText>
      </section>

      <section>
        <SectionHeaderText className="relative">
          PodCast on AIR
          <div className="absolute w-2 h-2 bg-red-600 top-0 -right-1 rounded-full" />
        </SectionHeaderText>
      </section>

      <section>
        <SectionHeaderText>Magazines</SectionHeaderText>
      </section>
    </Container>
  );
};

export default ExploreView;

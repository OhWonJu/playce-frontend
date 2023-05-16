import create from "zustand";

// 일부 data를  request 할 때 필요한 ID state 관리
interface PresentProductStoreProps {
  productId: string;
  productName: string;
  setProduct: (id: string, name: string) => void;
}

const PresentProductStore = create<PresentProductStoreProps>(set => ({
  // STATE
  productId: "",
  productName: "",

  //  ACTION
  setProduct: (id: string, name: string) => {
    set(state => ({ productId: id, productName: name }));
  },
}));

export default PresentProductStore;

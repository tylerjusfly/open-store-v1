export type IStoreDetails = {
    id: string;
    storename: string;
    domain_name: string;
    display_picture: string | null;
    hero_text: string | null;
    customization: IStoreCustomization | undefined
  };

  type IStoreCustomization = {
    main_color : string
    hero_svg: string | null
  }
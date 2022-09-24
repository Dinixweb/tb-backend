import type { UUID } from "sequelize/types";

interface IAcountType {
  id: typeof UUID;
  label: string;
  key: string;
  createdBy?: null | string;
}

export enum portalRef {
  web = "web-client",
  mobile = "mobile-client",
}

export type portalTypes = portalRef.web | portalRef.mobile;

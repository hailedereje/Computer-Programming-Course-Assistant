import { Button, Html } from "@react-email/components";

export const  EmailVarification = ({varification,title}: {varification: string,title: string})=> {
  return (
    <Html>
      <Button
        href={varification}
        style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
      >
        {title}
      </Button>
    </Html>
  );
}


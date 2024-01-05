import { Button, Html } from "@react-email/components";

export default function Email({varification}: {varification: string}) {
  return (
    <Html>
      <Button
        href={varification}
        style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
      >
        Click me
      </Button>
    </Html>
  );
}
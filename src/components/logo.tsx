export const Logo = () => {
  return (
    <>
      <img
        src="/logo.svg"
        alt="logo"
        className="h-10 mx-auto block dark:hidden"
      />
      <img
        src="/logo-dark.svg"
        alt="logo"
        className="h-10 mx-auto hidden dark:block"
      />
    </>
  );
};

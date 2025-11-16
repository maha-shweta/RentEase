import { Link, LinkProps } from "@tanstack/react-router";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps extends Omit<LinkProps, "className"> {
  className?: string;
  activeClassName?: string;
}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, activeClassName, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        className={className}
        activeProps={activeClassName ? { className: cn(className, activeClassName) } : undefined}
        {...props}
      />
    );
  }
);

NavLink.displayName = "NavLink";

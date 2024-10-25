"use client"

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface ComboboxProps {
  drop_down_list: { value: string; label: string }[];
  default_value: string;
  emptyValue?: string;
  onChange: (value: string) => void;
  selectedValue?: string;  // Add selectedValue to the interface
}



export function ComboboxDemo({
  drop_down_list,
  default_value,
  emptyValue,
  onChange,
  selectedValue,  // Destructure selectedValue from props
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  
  // If selectedValue is passed, use it as the initial value, otherwise default to an empty string
  const [value, setValue] = React.useState<string>(selectedValue as string); 

  const handleSelect = (selectedValue: string) => {
    setValue(selectedValue);
    onChange(selectedValue);  // Update the form value
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-auto text-[10px] sm:text-sm font-times sm:w-[200px] justify-between border-none"
        >
          {value
            ? drop_down_list.find((item) => item.value === value)?.label
            : default_value}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>{emptyValue}</CommandEmpty>
            <CommandGroup>
              {drop_down_list.map((item) => (
                <CommandItem
                  key={item.value}
                  onSelect={() => handleSelect(item.value)} // Call handleSelect on selection
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

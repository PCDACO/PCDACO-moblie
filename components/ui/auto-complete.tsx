import * as React from 'react';
import { TextInput, View, TouchableOpacity, Text, TextInputProps, FlatList } from 'react-native';

import { ChevronDown } from '~/lib/icons/ChevronDown';
import { cn } from '~/lib/utils';

interface AutocompleteProps<T> {
  data: T[];
  value: string;
  onChange: (text: string) => void;
  onSelect: (item: T) => void;
  getLabel: (item: T) => string;
  placeholder?: string;
}

const Autocomplete = <T,>({
  data,
  value,
  onChange,
  onSelect,
  getLabel,
  placeholder,
}: AutocompleteProps<T>) => {
  const [open, setOpen] = React.useState(false);

  const filteredData = data.filter((item) =>
    getLabel(item).toLowerCase().includes(value.toLowerCase())
  );

  return (
    <View className="relative">
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        className="h-10 rounded-md border px-3"
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
      />
      {open && filteredData.length > 0 && (
        <View className="absolute z-50 mt-2 w-full rounded-md border bg-white shadow-md">
          <FlatList
            data={filteredData}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  onSelect(item);
                  setOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-100">
                <Text>{getLabel(item)}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const AutocompleteTrigger = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  TextInputProps & { className?: string }
>(({ className, ...props }, ref) => (
  <View className="relative">
    <TextInput
      ref={ref}
      className={cn(
        'h-10 rounded-md border border-input bg-background px-3 text-base text-foreground',
        className
      )}
      {...props}
    />
    <ChevronDown className="absolute right-3 top-3 text-muted-foreground" />
  </View>
));

const AutocompleteContent = ({ children }: { children: React.ReactNode }) => (
  <View className="absolute z-50 mt-2 w-full rounded-md border bg-white shadow-md">{children}</View>
);

const AutocompleteItem = ({ label, onSelect }: { label: string; onSelect: () => void }) => (
  <TouchableOpacity onPress={onSelect} className="px-4 py-2 hover:bg-gray-100">
    <Text className="text-foreground">{label}</Text>
  </TouchableOpacity>
);

const AutocompleteLabel = ({ children }: { children: React.ReactNode }) => (
  <Text className="text-sm font-semibold text-muted-foreground">{children}</Text>
);

export {
  Autocomplete,
  AutocompleteTrigger,
  AutocompleteContent,
  AutocompleteItem,
  AutocompleteLabel,
};

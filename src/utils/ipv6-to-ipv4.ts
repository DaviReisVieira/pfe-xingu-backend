export function convertIPv6toIPv4(ipv6: string): string | null {
  const parts = ipv6.split(':');
  const ipv4Part = parts[parts.length - 1]; // A parte IPv4 está na última posição

  // Remova '::ffff:' para obter o endereço IPv4
  if (ipv4Part.startsWith('::ffff:')) {
    return ipv4Part.replace('::ffff:', '');
  } else {
    // Não é um endereço IPv6 no formato '::ffff:IPv4'
    return ipv4Part;
  }
}

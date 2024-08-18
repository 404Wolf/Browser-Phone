{pkgs, ...}:
pkgs.buildShellApplication {
  name = "janus";
  runtimeInputs = [pkgs.janus-gateway];
  text =
    #bash
    ''
      JANUS=${pkgs.janus-gateway}/bin/janus
      JANUS_INSTALL=${pkgs.janus-gateway}/lib/janus/plugins
      JANUS_CONFIG_DIR=${./configs}
      JANUS_CONFIG=${./janus.jcfg}
      ${builtins.readFile ./launch.sh}
    '';
}
